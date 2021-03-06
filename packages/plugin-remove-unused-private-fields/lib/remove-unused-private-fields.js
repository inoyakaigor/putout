'use strict';

const {
    traverse,
} = require('putout');

module.exports.report = ({name}) => `private field "#${name}" declared by not used`;

module.exports.find = (ast) => {
    const vars = [];
    const addVar = addVariable(vars);
    const rmVar = removeVariable(vars);
    
    traverseClass(ast, {
        ClassPrivateProperty(path) {
            const keyPath = path.get('key');
            addVar(path, keyPath.node.id.name);
        },
        
        ClassPrivateMethod(path) {
            const keyPath = path.get('key');
            addVar(path, keyPath.node.id.name);
        },
        
        ThisExpression(path) {
            const {parentPath} = path;
            const propertyPath = parentPath.get('property');
            
            if (!propertyPath.isPrivateName())
                return;
            
            rmVar(path, propertyPath.node.id.name);
        },
    });
    
    return Object.values(vars);
};

module.exports.fix = ({path}) => {
    path.remove();
};

function findClassName(path) {
    let nextPath = path;
    
    while(!nextPath.isClassDeclaration()) {
        nextPath = nextPath.parentPath;
    }
    
    return nextPath.node.id.name;
}

const addVariable = (vars) => (path, name) => {
    const {uid} = findClassName(path);
    const id = `${uid}-${name}`;
    
    if (!vars[id])
        vars[id] = {};
    
    vars[id] = {
        path,
        name,
    };
};

const removeVariable = (vars) => (path, name) => {
    const {uid} = findClassName(path);
    const id = `${uid}-${name}`;
    
    delete vars[id];
};

function traverseClass(ast, visitor) {
    traverse(ast, {
        ClassDeclaration(path) {
            path.traverse(visitor);
        },
    });
}

