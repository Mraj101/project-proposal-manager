const proposalService = require("../../Core/services/proposals/index");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const { ApiError } = require("../../utils/ApiError.js");

async function createProposals(req, res) {
  try {
    console.log("Controller", req.body);
    console.log("file", req.file);
    console.log("hello proposal creating");
    let response = await proposalService.create(req);
    return res
      .status(201)
      .json(new ApiResponse(200, response, "proposals created Successfully"));
  } catch (err) {
    // console.log(err);
    // let newError = createErrorMessage();
    // newError.status = 500;
    // newError.message = "User Control Service Internal Server Error";
    // return res.send(newError);
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      console.error(err);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
}

async function getAll(req, res) {
  try {
    // console.log("Controller", req.body);
    console.log("hello");
    let response = await blogServices.getAll();
    return res
      .status(201)
      .json(new ApiResponse(200, response, "get all blogs"));
  } catch (err) {
    // console.log(err);
    // let newError = createErrorMessage();
    // newError.status = 500;
    // newError.message = "User Control Service Internal Server Error";
    // return res.send(newError);
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      console.error(err);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
}

async function getProposals(req, res) {
  try {
    // console.log("Controller", req.body);
    console.log("hello");
    let response = await proposalService.get(req);
    return res
      .status(201)
      .json(new ApiResponse(200, response, "get proposals"));
  } catch (err) {
    // console.log(err);
    // let newError = createErrorMessage();
    // newError.status = 500;
    // newError.message = "User Control Service Internal Server Error";
    // return res.send(newError);
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      console.error(err);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
}

async function getSingleProposals(req, res){
  try{
    let response = await proposalService.getIndividual(req);
    return res
      .status(201)
      .json(new ApiResponse(200, response, "get single blog"));
  } catch (err) {
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      console.error(err);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
}

async function getSingleBlog(req, res) {
  try {
    // console.log("Controller", req.body);
    // console.log("file", req.file);
    console.log("hello");
    let response = await blogServices.getSingle(req);
    return res
      .status(201)
      .json(new ApiResponse(200, response, "get single blog"));
  } catch (err) {
    // console.log(err);
    // let newError = createErrorMessage();
    // newError.status = 500;
    // newError.message = "User Control Service Internal Server Error";
    // return res.send(newError);
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      console.error(err);
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal Server Error"));
    }
  }
}

module.exports = { createProposals, getSingleBlog, getProposals, getAll };
