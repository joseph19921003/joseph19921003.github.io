/*查找二叉树*/
function Node(data,left,right){
    this.data = data;
    this.left = left;//保存left节点链接
    this.right = right;
    this.show = show;
}


function show(){
    return this.data;//显示保存在节点中的数据
}


/*查找最小值*/
function getMin(){
    var current = this.root;
    while(!(current.left == null)){
        current = current.left;
    }
    return current.data;
}

/*查找最大值*/
function getMax(){
    var current = this.root;
    while(!(current.right == null)){
        current = current.right;
    }
    return current.data;
}


/*查找树  先序遍历*/
var node = {
	child = [],
	parent = childnode_parent,
	data = node.data;
}
var finddata = finddata;
function findNode(node) {
	var current = node;
	for (var i = 0; i <= node.child.length - 1; i++) {
	    if(!(node.child[i] == null)) {
	     	current = findNode(node.child[i]);
		}
		else {
			if(current.data == finddata) {
				//do something
				continue;
			}
			else {
				break;
			}
		}
	}
}