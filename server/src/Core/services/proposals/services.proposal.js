const proposalModels = require("../../../models/proposals.models");
const countModels = require("../../../models/count.models");
const userModels = require("../../../models/user.models");
const { ApiError } = require("../../../utils/ApiError");
const { uploadOnCloudinary } = require("../../../utils/cloudinary");

async function create(data) {
  try {
    console.log(data.file, "file");
    console.log(data.body, "data body");

    // console.log(imgOnCloudinary,"cloud image")

    const { title, description, supervisorId, user } = data.body;
    const fileOnCloud = await uploadOnCloudinary(data.file.path);

    // console.log(fileOnCloud,"how file on cloud?");
    const fileUrl = fileOnCloud.url;
    const proposalInstance = await proposalModels.create({
      projectTitle: title,
      description,
      supervisorId,
      user,
      file: fileUrl,
    });

    const userInstance = await userModels.findById(data.body.user);

    // console.log(userInstance,"userinstance");

    const proposalCreated = {
      username: userInstance.username,
      userImg: userInstance.img,
      userEmail: userInstance.email,
      projectTitle: proposalInstance.projectTitle,
      description: proposalInstance.description,
      supervisorId: proposalInstance.supervisorId,
      file: proposalInstance.file,
      createdAt: proposalInstance.createdAt,
      updatedAt: proposalInstance.updatedAt,
    };
    // console.log(blogInstance,"bloginstance");
    return proposalCreated;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "ProposalService not available");
    }
  }
}

// async function getAll() {
//   try {
//     const allBlogs = await proposalModels.find({}).lean();
//     const allUsers = await userModels.find({}).lean();
//     const allViews = await countModels.find({}).lean();
//     // console.log(allBlogs,"allblogs");
//     // console.log(allUsers,"allusers");

//     const blogs = allBlogs.map((singleBlog) => {
//       const user = allUsers.find(
//         (singleUser) => singleUser._id.toString() === singleBlog.user.toString()
//       );
//       const view = allViews.find(
//         (singleView) =>
//           singleView.blogId.toString() === singleBlog._id.toString()
//       );
//       // console.log(singleBlog.user,"user");
//       console.log(view, "singleUser");
//       if (user) {
//         return {
//           ...singleBlog,
//           count: view?.count || 0,
//           userImage: user.img,
//           userName: user.username,
//         };
//       }
//     });
//     // console.log(blogs,"blogs");
//     return blogs;
//   } catch (error) {
//     if (error instanceof ApiError) {
//       throw error;
//     } else {
//       console.log(error);
//       throw new ApiError(500, "BlogService not available");
//     }
//   }
// }


async function get(data) {
  try {
    console.log("inside get proposals",data.body);
    const userId = data.body._id;

    const allProposals = await proposalModels.find({ user: userId }).lean();

    const user = await userModels.findById(userId).lean();

    console.log("all blogs",allProposals);
    console.log("proposal of user",user);

    const modifiedProposals = allProposals.map((singleProposal, index) => {
      return {
        _id: singleProposal._id,
        userImage: user.img,
        userName: user.username,
        ...singleProposal,
      };
    });
    console.log(modifiedProposals, "modified proposals");

    return modifiedProposals;
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "proposal service not available");
    }
  }
}

async function getIndividual(data) {
  try {
    const userEmail = data.body.supervisorEmail;
    const user = await userModels.findOne({email: userEmail}).lean();
    const position = user?.position.toString();
    const allProposals = await proposalModels.find({ supervisorId: position }).lean();
    
    const modifiedProposals = allProposals.map((singleProposal, index) => {
      return {
        _id: singleProposal._id,
        projectTitle: singleProposal.projectTitle,
        projectTitle: singleProposal.projectTitle,
        file: singleProposal.file,
        isAccepted: singleProposal.isAccepted,
        isRejected: singleProposal.isRejected,
        isAccepetedByHOD: singleProposal.isAccepetedByHOD,
        createdAt: singleProposal.createdAt,
        updatedAt: singleProposal.updatedAt,
      };
    });
    // console.log(modifiedProposals, "modified proposals");
    return modifiedProposals;
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "proposal service not available");
    }
  }
}



async function getSingle(data) {
  try {
    const { id } = data.params;
    //   console.log(data.params,"parameter");
    const singleBlog = await proposalModels.findById(id).lean();
    const singleUser = await userModels.findById(singleBlog.user).lean();
    // console.log(singleBlog,"singleblog");
    // console.log(singleUser,"singleuser");
    const modifiedResponse = {
      ...singleBlog,
      username: singleUser.username,
      userImg: singleUser.img,
    };
    // console.log(modifiedResponse,"response modified");
    return modifiedResponse;
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      console.log(error);
      throw new ApiError(500, "BlogService not available");
    }
  }
}

module.exports = { create, get, getSingle,getIndividual };
