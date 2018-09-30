'use strict';

var objectAssign = require('object-assign');
var compile  = require('es6-template-strings/compile');
var template = require('es6-template-strings');
var resolve  = require('es6-template-strings/resolve-to-string');

module.exports = function(obj, opts){

    var options = objectAssign({}, opts);

    if (!obj) {
        throw new Error('You must supply an object to print');
    }

    var unpacked;

    if (options.html){
        unpacked = unpackEmbeddedObjects(obj, '', '<br>');
        return printToHTML(unpacked, options);
    } else {
        unpacked = unpackEmbeddedObjects(obj, '\n  ', '');
        return printObject(unpacked, '', '\n');
    }


};

/**
 *
 * @param {Object} obj
 * @param {String} beforeLine
 * @param {String} afterLine
 * @returns {{}}
 */

function unpackEmbeddedObjects(obj, beforeLine, afterLine){

    var o = {};

    for(var key in obj){

        if (obj.hasOwnProperty(key)){

            var value = obj[key];
            var isArray = Array.isArray(value);

            if (!isArray && typeof value === 'object'){
                o[key] = printObject(value, beforeLine, afterLine);
            } else {
                o[key] = value;
            }
        }

    }

    return o;

}

function printObject(obj, beforeLine, afterLine){

    var s = '';

    for (var key in obj){
        if (obj.hasOwnProperty(key)){
            s += beforeLine + key + ": "+obj[key].toString();
            s += afterLine;
        }
    }

    return s;
}

function printToHTML(obj, opts){

    var options = objectAssign({}, opts);

    var element = options.tag ? options.tag : 'table';
    var tableStart = compile('<table${s1}${c}${s2}${a}>');
    var trTemplate = compile('<tr><td>${key}</td><td>${value}</td></tr>');
    var divStart = compile('<div${c}${a}>');
    var divTemplate = compile('<div><span>${key}</span><span>${value}</span></div>');
    var closeTags = ['</table>', '</div>'];

    var className = options.class ? template('class="${c}"', {c:options.class}) : '';
    var htmlAttr = options.attr || '';

    var spacer1 = className.length > 0 ? ' ' : '';
    var spacer2 = htmlAttr.length  > 0 ? ' ' : '';

    var row;
    var start;
    var end;

    if (element === 'table'){
        row = trTemplate;
        start = resolve(tableStart, {s1:spacer1, c:className, s2:spacer2, a:htmlAttr });
        end = closeTags[0];
    } else {
        row = divTemplate;
        start = resolve(divStart, {c:className, s:spacer, a:htmlAttr });
        end = closeTags[1];
    }

    var html = start;

    for(var key in obj){

        if (obj.hasOwnProperty(key)){
            var value = obj[key];
            html += resolve(row, {key:key, value:value});
        }
    }

    html += end;

    return html;

}

