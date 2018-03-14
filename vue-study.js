function dependArray (value) {
    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    }
}


function mergeHook (
    parentVal,
    childVal
) {
    return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal    
}


