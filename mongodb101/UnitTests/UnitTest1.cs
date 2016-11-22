using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using mongodb101.Utils;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;

namespace UnitTests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            StringUtils su = new StringUtils();
            string input = "tech";
            List<String> resp =  su.GetPermutations(input);
            Assert.IsTrue(MathUtils.nPr(input.Length,input.Length) == resp.Count);
            int i = 0;
            //resp.ForEach(s => Debug.WriteLine(s));
            //Console.ReadKey();
        }
    }
}
