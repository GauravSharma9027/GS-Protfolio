const ViewerContact = require("../../models/viewerSide/ViewerContact.model");

const viewerSendMessage = async (req, res) => {
    try {
        const { viewerName, email, viewerSubject, viewerMessage } = req.body;
        if (!viewerName || !email || !viewerSubject || !viewerMessage || viewerName === "" || email === "" || viewerSubject === "" || viewerMessage === "") {
            return res.status(301).json({
                success: false,
                message: "something is missing!"
            });
        }
        await ViewerContact.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Message Sent Successfully",
        });
    } catch (error) {
        console.log("error in viewerSendMessage function: ", error);
    }
}

const getViewerSendMessage = async (req, res) => {
    try {
        const viewerContact = await ViewerContact.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: viewerContact,
        });
    } catch (error) {
        console.log("error in getViewerSendMessage function: ", error);
    }
}

// const getViewerSendMessageOneByOne = async (req,res) => {
//     try {
//         const id = req.params.id;
//         console.log("id:1:", id);
//         const viewerContact = await ViewerContact.findById({_id: id});
//         return res.status(200).json({
//             success: true,
//             data: viewerContact,
//         });
//     } catch (error) {
//         console.log("error in getViewerSendMessage function: ",error);
//     }
// }

const deleteViewerIndividualMessage = async (req, res) => {
    try {
        const id = req.params.id;
        await ViewerContact.deleteOne({ _id: id });
        return res.status(200).json({
            message: "Delete Successfully",
            success: true
        })
    } catch (error) {
        console.log("error in  deleteViewerIndividualMessage function: ", error);
    }
}

module.exports = {
    viewerSendMessage,
    getViewerSendMessage,
    // getViewerSendMessageOneByOne,
    deleteViewerIndividualMessage
}
