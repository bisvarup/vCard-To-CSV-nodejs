import test from 'ava';
import printObject from './index.js';
import condense from 'selective-whitespace';

var obj1 = { one: 1, two: 2, three: 3 };
var obj2 = { one: 1, two: 2, three: 3, four: {a:1, b:2} };
var obj3 = { one: 1, two: 2, three: 3, four: ["five", "six"] };
var obj4 = { one: 1, two: 2, three: 3, four: {a:1, b:2}, five: ["six", "seven"] };

var cOpts = { keep:'\n,\t' };

test('should fail if no object is supplied', t => {
    t.throws(() => { printObject() }, 'You must supply an object to print');
});

test('should print an object to a string', t => {
    t.is(printObject(obj1), 'one: 1\ntwo: 2\nthree: 3\n');
});

test('should print an embedded object', t => {
    let result = printObject(obj2);
    t.is(condense(result, cOpts), 'one: 1\ntwo: 2\nthree: 3\nfour: \n a: 1\n b: 2\n');
});

test('should print an embedded array', t => {
    let result = printObject(obj3);
    t.is(condense(result, cOpts), 'one: 1\ntwo: 2\nthree: 3\nfour: five,six\n');
});

test('should print with multiple embedded objects', t => {
    let result = printObject(obj4);
    t.is(condense(result, cOpts), 'one: 1\ntwo: 2\nthree: 3\nfour: \n a: 1\n b: 2\nfive: six,seven\n');
});

test('should output html', t => {
    t.is(printObject(obj4, {html:true}), '<table><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr><tr><td>three</td><td>3</td></tr><tr><td>four</td><td>a: 1<br>b: 2<br></td></tr><tr><td>five</td><td>six,seven</td></tr></table>');
});

test('can supply a custom class on html element', t => {
    t.is(printObject(obj4, {html:true, class:'customClass'}), '<table class="customClass"><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr><tr><td>three</td><td>3</td></tr><tr><td>four</td><td>a: 1<br>b: 2<br></td></tr><tr><td>five</td><td>six,seven</td></tr></table>');
});

test('can supply custom attributes on html element', t => {
    t.is(printObject(obj4, {html:true, attr:'border="1"'}), '<table border="1"><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr><tr><td>three</td><td>3</td></tr><tr><td>four</td><td>a: 1<br>b: 2<br></td></tr><tr><td>five</td><td>six,seven</td></tr></table>');
});


test('can supply custom attributes and custom class on html element', t => {
    t.is(printObject(obj4, {html:true, attr:'border="1"', class:'customClass'}), '<table class="customClass" border="1"><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr><tr><td>three</td><td>3</td></tr><tr><td>four</td><td>a: 1<br>b: 2<br></td></tr><tr><td>five</td><td>six,seven</td></tr></table>');
});

test('can use the attr feature to assign a class', t => {
    t.is(printObject(obj4, {html:true, attr:'class="customClass"' }), '<table class="customClass"><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr><tr><td>three</td><td>3</td></tr><tr><td>four</td><td>a: 1<br>b: 2<br></td></tr><tr><td>five</td><td>six,seven</td></tr></table>');
});

test('can use the attr feature to assign an id and style', t => {
    t.is(printObject(obj4, {html:true, attr:'id="myID" style="color:white"' }), '<table id="myID" style="color:white"><tr><td>one</td><td>1</td></tr><tr><td>two</td><td>2</td></tr><tr><td>three</td><td>3</td></tr><tr><td>four</td><td>a: 1<br>b: 2<br></td></tr><tr><td>five</td><td>six,seven</td></tr></table>');
});



