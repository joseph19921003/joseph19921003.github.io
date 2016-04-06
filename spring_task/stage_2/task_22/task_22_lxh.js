/**
 * Created by SunshineLXH on 2016/3/30.
 */
var btn = document.getElementsByTagName('button'),
    doDLR = btn[0],
    doLDR = btn[1],
    doLRD = btn[2];

function Node(data, left, right){
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}

function inOrder(node){
    if (!(node == null)){
        inOrder(node.left);
        putstr(node.show() + ' ');
        inOrder(node.right);
    }
}

function show(){
    return this.data;
}

function preOrder(node){
    if (!(node == null)){
        putstr(node.show() + ' ');
        preOrder(node.left);
        preOrder(node.right);
    }
}

function postOrder(node){
    if (!(node == null)){
        postOrder(node.left);
        postOrder(node.right);
        putstr(node.show() + ' ');
    }
}