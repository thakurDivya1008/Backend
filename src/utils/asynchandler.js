 const asyncHandler = (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
 }

export {asyncHandler}; // Exporting asyncHandler from here so that it can be used in other files.
// **** Higher order function*******
// const asyncHandler= () => {}
// const asyncHandler = (func) => {() => {}}//we wrap a function within a function and we can also write it without wrapping curly braces.
// const asyncHandler = (fn) => async () => {}
// *********Wrapper function through try catch*******
//     const asyncHandler = (fn) => async ( req,res,next) => {
// try{
//  await fn(req,res,next)
// }
// catch(error){
//     res.status(error.code || 500).json({
//         success: false,
//         message: error.message
//     })
// }
//     }



