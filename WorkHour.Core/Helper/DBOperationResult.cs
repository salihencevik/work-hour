using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WorkHour.Core
{
    public class DbOperationResult
    {

        #region Properties
        /// <summary>
        /// Gets that is this operation succeded or not?
        /// </summary>
        public bool IsSucceeded { get; private set; }

        /// <summary>
        /// Gets the exception which is occured during the operation
        /// </summary>
        public Exception Exception { get; private set; }

        /// <summary>
        /// Gets the message that the operation result
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Gets the list of the validation results
        /// </summary>
        public ValidationResult ValidationResults { get; set; }
        #endregion

        #region Initialization

        /// <summary>
        ///  Initialize a new instance of this class
        /// </summary>
        public DbOperationResult()
        {
            IsSucceeded = true;
        }

        /// <summary>
        /// Initialize a new instance of this class
        /// </summary>
        /// <param name="results"></param>
        public DbOperationResult(ValidationResult results)
        {
            ValidationResults = results;
            IsSucceeded = false;
            Message = results.ErrorMessage;
        }

        /// <summary>
        /// Initialize a new instance of this class
        /// </summary>
        /// <param name="ex"></param>
        public DbOperationResult(Exception ex)
        {
            Exception = ex;
            IsSucceeded = false;

            var validException = ex as ValidationException;
            if (validException != null)
            {
                ValidationResults = validException.ValidationResult;
            }
        }

        #endregion
    }

    /// <summary>
    /// Represents a result for an CRUD operation
    /// </summary>
    public class DbOperationResult<T> : DbOperationResult
    {
        #region Properties
        /// <summary>
        /// Gets or sets result item
        /// </summary>
        public T Item { get; private set; }
        #endregion

        #region Initialization

        /// <summary>
        ///  Initialize a new instance of this class
        /// </summary>
        public DbOperationResult(T item) : base()
        {
            Item = item;
        }

        /// <summary>
        /// Initialize a new instance of this class
        /// </summary>
        /// <param name="results"></param>
        public DbOperationResult(ValidationResult results) : base(results)
        {
        }

        /// <summary>
        /// Initialize a new instance of this class
        /// </summary>
        /// <param name="ex"></param>
        public DbOperationResult(Exception ex) : base(ex)
        {
        }

        #endregion
    }
}
