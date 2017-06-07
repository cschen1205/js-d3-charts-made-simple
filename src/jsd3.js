var jsd3 = jsd3 || {};

(function (jss) {
    'use strict';
	
    jss.threeWaysStringQuickSort = function(a) {
        jss._sort(a, 0, a.length-1, 0);    
    };
    
    jss._sort = function(a, lo, hi, d) {
        if(lo >= hi) return;
        
        var i = lo, lt = lo, gt = hi;
        var c = jss._charAt(a[lo], d);
        while(i <= gt) {
            var cmp = jss._charAt(a[i], d) - c;
            if(cmp < 0) {
                jss.exchange(a, i++, lt++);
            } 
            else if(cmp > 0) {
                jss.exchange(a, i, gt--);
            }
            else {
                i++;
            }
        }
        
        jss._sort(a, lo, lt-1, d);
        jss._sort(a, lt, gt, d+1);
        jss._sort(a, gt+1, hi, d);
    };
    
    jss._charAt = function(a, d) {
        if(a.length <= d) {
            return -1;
        }  
        return a.charCodeAt(d);
    };
    
    jss.exchange = function(a, i, j){
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    };
    
    jss.lrs = function(s) {
        var N = s.length;
        var a = [];
        for(var i = 0; i < N; ++i){
            a.push(s.substring(i, N));
        }
        
        jss.threeWaysStringQuickSort(a);
        
        var result = "";
        for(var i=0; i < N-1; ++i) {
            var lcs = jss.lcs(a[i], a[i+1]);
            if(lcs.length > result.length) {
                result = lcs;
            }
        }
        
        return result;
    };
    
    jss.lcs = function(s1, s2) {
        var len = Math.min(s1.length, s2.length);
        for(var i=0; i < len; ++i) {
            if(jss._charAt(s1, i) != jss._charAt(s2, i)){
                return s1.substring(0, i);
            }
        }
        return s1.substring(0, len-1);
    };
    
})(jsd3);

var module = module || {};
if(module) {
	module.exports = jsd3;
}