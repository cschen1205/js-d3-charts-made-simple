var expect = require("chai").expect;
var jsd3 = require("../src/jsd3");

describe("Longest Repeated Substring", function(){
   it("should be able to isolate the longest repeated sub-seqeunce from text body", function(){
       var text = "ATCGATCGA$";
       expect(jsd3.lrs(text)).to.equal("ATCGA");
       console.log(jsd3.lrs(text));
   }) ;
});