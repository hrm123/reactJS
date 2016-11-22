using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

namespace mongodb101.Utils
{
    public class StringUtils
    {
        #region Fields
        private List<string> _perms = new List<string>();
        #endregion

        #region Private


        private void GetPermutationsNonIterative(string input, string wkrString)
        {

        }

        /// <summary>
        /// input,wkrString should be non-null
        /// </summary>
        /// <param name="input"></param>
        /// <param name="wkrString"></param>
        private void GetPermutationsIterative(string input, string wkrString)
        {
            if(String.IsNullOrEmpty(input) || input.Trim().Length ==0)
            {
                //end condition
                _perms.Add(wkrString.ToString());
                return;
            }
            char[] chars = input.ToCharArray();
            foreach(char c1 in chars)
            {
                string inputTmp = input.Replace(c1.ToString(),String.Empty);
                GetPermutationsIterative(inputTmp, wkrString + c1);
            }
        }

        #endregion Private

        #region public
        public List<string> GetPermutations(string inputString)
        {
            if(String.IsNullOrWhiteSpace( inputString))
            {
                throw new ArgumentNullException("inputString");
            }
            //check for any repeated characters


            //StringBuilder sb = new StringBuilder();
            string sb = "";
            GetPermutationsIterative(inputString, sb);
            return _perms;

        }
        #endregion public
    }
}