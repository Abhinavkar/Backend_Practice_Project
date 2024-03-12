// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);

//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message || "Something went wrong",
//     });
//   }
// };

// export default asyncHandler;

// OTHER METHOD foR prODUCTION GRADE
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(
      requestHandler(req, res, next).catch((err) => {
        // when promise is rejected then it will throw error to next
        next(err);
      })
    );
  };
};
export default asyncHandler;
