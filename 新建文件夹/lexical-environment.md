###ES5词法环境

词法环境由两部分组成：环境记录项（environment record）和引用外部词法环境的outer属性

环境记录项有两种类型：申明式环境记录项，对象式环境记录项。

申明式环境记录项会出现在函数作用域（这时和es3的活动对象对应）或者catch从句中，它的实现形式并不是简单的对象，它是更底层的形式，用于数据的快速存取。

申明式环境记录项取代ES3的活动对象的主要原因是效率的问题。

对象式环境记录项会出现在全局上下文和with语句中，它的实现形式就是简单的对象，我们称为绑定对象，它是原始对象（如全局对象）的一个映射，但不是所有原始对象中的属性都会出现在绑定对象中，比如名字不是标识符的属性。由于是对象的形式，所以不是很高效。

####执行上下文
和es3中的执行上下文有区别，es3中的执行上下文由this值，作用域链以及变量对象(活动对象)，而es5中的执行上下文由this绑定(就是this值)，变量环境以及词法环境组成，变量环境和词法环境容易让人混淆，实际上他们都是词法环境，一开始进入执行环境的时候都是相同的，但代码执行阶段变量环境不会变，但词法环境可能会变。如使用with以及catch从句，会延延长作用域链，词法环境会改变。但要注意，对于函数申明来说，它的作用域链是不会变的，因为函数申明只能出现在程序级别或者作为内部函数出现，不能出现在其他代码块中（虽然出现也不会报错），这种情况下无论是不是在with或者catch中调用都还是原来的作用域链，毕竟是创建的时候决定了[[scope]]，延长的作用域和函数申明没有关系，所以他的[[scope]]是变量环境。对于函数表达式，因为在代码执行阶段才会创建，如果是在with或者catch中，此时词法环境会扩大，作用域延长，所以函数表达式的[[scope]]是词法环境，词法环境和变量环境从名字上让人混淆，问题就是出现在函数申明和函数表达式上。
>This is why, closures formed as function declarations (FD) save the VariableEnvironment component as their [[Scope]] property, and function expressions (FE) save exactly LexicalEnvironment component in this case. This is the main (and actually the only) reason of separation of these two, at first glance the same, components.

```
var a = 10;
 
// FD
function foo() {
  console.log(a);
}
 
with ({a: 20}) {
 
  // FE
  var bar = function () {
    console.log(a);
  };
 
  foo(); // 10!, from VariableEnvrionment
  bar(); // 20,  from LexicalEnvrionment
 
}
 
foo(); // 10
bar(); // still 20
```
####引用规范类型
引用是是内部的一种类型（本质是已经解析好了的命名绑定，但还不是真正的你要的东西，真正的东西还需要通过[[GetValue]]内部方法得到，基本上所有的运算都会涉及[[GetValue]]），在标识符解析以及属性访问的时候都会产生这种引用类型，它由三部分组成：base，referenced name，flag，还有一系列访问这个引用的方法。

对于群组运算符--()
>The production PrimaryExpression : ( Expression ) is evaluated as follows:
1. Return the result of evaluating Expression. This may be of type Reference.
>
NOTE This algorithm does not apply GetValue to the result of evaluating Expression. The principal motivation for this is so that operators such as delete and typeof may be applied to parenthesised expressions.

它返回的可能是引用（没有[[GetValue]]这个过程），因为可能对于typeof或者delete运算符，它右边的操作数可能会用小括号包围一下，如果群组运算符有[[GetValue]]这个过程的话typeof或者delete是没有用的，因为它希望右边是个左值（是个引用）。左值和引用的概念很像，如果有助于理解的话可以互换。

this是由调用表达式的形式决定的，本质上和引用类型的base相关联，如果调用表达式的左侧（exp()如exp）得到的不是引用类型（标识符解析和属性访问都会得到引用类型），那this值就是全局对象或则undefined，如果是引用类型，还要考虑base是不是活动对象或者环境记录项，是的话this也是全局对象或者undefined，然后再使用谁调用指向谁基本就能确定this的值了。

####命名函数表达式
在函数表达式内部可以通过这个名字递归调用自己，因为在函数表达式创建（在代码执行阶段）时会创建一个特殊的对象（这个特殊对象在一些老版本中就是普通的对象，有原型链的解析过程，新的版本没有原型链），该对象的唯一属性就是这个名字，即对这个函数的引用，这个对象会被添加到作用域链中（[[scope]]），这时候在内部就可以访问这个函数了。但是不同的实现也是不相同的，Rhino保存这个名字在这个函数表达式的活动对象中，只有内部可以访问。而微软的JScript（老版本）会保存在上层的活动对象中，在上层都可以访问，这显然不符合规则。