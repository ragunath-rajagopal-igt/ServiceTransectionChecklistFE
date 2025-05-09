export const constants = {
    genericSystemMsg: {
        create: "Created successfully",
        update: "Updated successfully",
        delete: "Deleted successfully",
        download: "Download successfully",
        error: "An error occured, please try again",
    },
    status: {
        created: "created",
        submitted: "submitted",
        approved: "approved",
        sent_to_generate_activity: "sent_to_generate_activity",
        referred_back: "referred_back",
        generated: "generated",
    },
    statusOption: [
        { value: "created", label: "Created" },
        { value: "submitted", label: "Pending for approval" },
        { value: "approved", label: "Approved" },
        { value: "sent_to_generate_activity", label: "Sent to Generate Activity" },
        { value: "referred_back", label: "Referred Back" },
        { value: "generated", label: "Generated" },
    ],
    appUserStatus: {
        active: "Active",
        inActive: "InActive",
    },
    role: {
        admin:"Admin",
        otheruser:"Other User"
    },
    module: {
      dashboard: "dashboard",
      user: "user",
      networkSetup: "network-setup",
      hire: "hire",
      projectMovement: "project-movement",
      locationTransfer: "location-transfer",
      shortTrip: "short-trip",
      inactivate: "inactivate",
      reactivate: "reactivate",
      terminate: "terminate",
      reports: "reports",
      generateActivity: "generate-activity",
    }
}