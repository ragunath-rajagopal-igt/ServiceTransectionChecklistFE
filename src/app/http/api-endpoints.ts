import { environment } from "src/environments/environment";

const API_ENDPOINT = environment.apiUrl;

export const APIEndPoints = {
    auth: {
        login: environment.apiUrl + '/auth/login',
        refreshToken: environment.apiUrl + '/auth/refresh-token',
        logout: environment.apiUrl + '/auth/logout',
        verifyEmail: environment.apiUrl + '/auth/verify-email',
        updatePassword: environment.apiUrl + '/auth/update-password',
    },
    newUser: environment.apiUrl + '/user/create',
    saveUser: environment.apiUrl + '/user/save',
    editUser:environment.apiUrl + '/user/edit',
    updateUser:environment.apiUrl + '/user/updateuser',
    getLocation:environment.apiUrl + '/auth/slocation',
    
    common: {
        location: `${API_ENDPOINT}/common/location`,
        subLocation: `${API_ENDPOINT}/common/sublocation`,
        allSubLocation: `${API_ENDPOINT}/common/all-sublocation`,
        fileUpload:environment.apiUrl + '/common/upload',
        download: `${API_ENDPOINT}/common/download`,
    },
    newuser: {
        get: `${API_ENDPOINT}/user/list`,
        generateForm: `${API_ENDPOINT}/user/generate-form`,
        save: `${API_ENDPOINT}/user/save`,
        update: `${API_ENDPOINT}/user/updateuser`,
        delete: `${API_ENDPOINT}/user/delete`,
        igtIdAndEmailForm: `${API_ENDPOINT}/user/igt-id-email-form`,
        igtIdAndEmailUpdate: `${API_ENDPOINT}/user/igt-id-email-update`,
        updateStatusUser: `${API_ENDPOINT}/user/update-status`,
    },
    constructural:{
        generateForm: `${API_ENDPOINT}/constructural/generate-form`,
        save: environment.apiUrl + '/constructural/save',
        delete: `${API_ENDPOINT}/constructural/delete`,
        update: `${API_ENDPOINT}/constructural/update`,
    },
    dataManagement:{
        generateForm: `${API_ENDPOINT}/data-management/generate-form`,
        save: environment.apiUrl + '/data-management/save',
        delete: `${API_ENDPOINT}/data-management/delete`,
        update: `${API_ENDPOINT}/data-management/update`,
    },
    operations:{
        generateForm: `${API_ENDPOINT}/operations/generate-form`,
        save: environment.apiUrl + '/operations/save',
        delete: `${API_ENDPOINT}/operations/delete`,
        update: `${API_ENDPOINT}/operations/update`,
    },
    serviceManagement:{
        generateForm: `${API_ENDPOINT}/service-management/generate-form`,
        save: environment.apiUrl + '/service-management/save',
        delete: `${API_ENDPOINT}/service-management/delete`,
        update: `${API_ENDPOINT}/service-management/update`,
    },
    technical:{
        generateForm: `${API_ENDPOINT}/technical/generate-form`,
        save: environment.apiUrl + '/technical/save',
        delete: `${API_ENDPOINT}/technical/delete`,
        update: `${API_ENDPOINT}/technical/update`,
    },
    dashboard : {
        getDetails: `${API_ENDPOINT}/dashboard/details`,
    },
    accountSetting: {
        save: `${API_ENDPOINT}/account-setting/register`,
        generateForm: `${API_ENDPOINT}/account-setting/generate-form`,
        getAppUserList: `${API_ENDPOINT}/account-setting/app-user-list`,
        getAccountListByModule: `${API_ENDPOINT}/account-setting/account-setting-list`,
        getManagerDetailsList: `${API_ENDPOINT}/account-setting/manager-details-list`,
        saveManagerDetails: `${API_ENDPOINT}/account-setting/save-manager-details`,
        generateManagerForm: `${API_ENDPOINT}/account-setting/generate-manager-form`,
        updateManagerDetails: `${API_ENDPOINT}/account-setting/update-manager-details`,
        deleteManagerDetails: `${API_ENDPOINT}/account-setting/delete-manager-details`,
    },
    adminSeverity:{
        listData:environment.apiUrl + '/admin/severity/list',
        generateForm: `${API_ENDPOINT}/admin/severity/generate-form`,
        save: environment.apiUrl + '/admin/severity/save',
        delete: `${API_ENDPOINT}/admin/severity/delete`,
        update: `${API_ENDPOINT}/admin/severity/update`,
    },
    adminSubArea:{
        listData:environment.apiUrl + '/admin/subarea/list',
        generateForm: `${API_ENDPOINT}/admin/subarea/generate-form`,
        save: environment.apiUrl + '/admin/subarea/save',
        delete: `${API_ENDPOINT}/admin/subarea/delete`,
        update: `${API_ENDPOINT}/admin/subarea/update`,
    },
    adminItem:{
        listData:environment.apiUrl + '/admin/item/list',
        generateForm: `${API_ENDPOINT}/admin/item/generate-form`,
        save: environment.apiUrl + '/admin/item/save',
        delete: `${API_ENDPOINT}/admin/item/delete`,
        update: `${API_ENDPOINT}/admin/item/update`,
    },
    adminProductName:{
        listData:environment.apiUrl + '/admin/productname/list',
        generateForm: `${API_ENDPOINT}/admin/productname/generate-form`,
        save: environment.apiUrl + '/admin/productname/save',
        delete: `${API_ENDPOINT}/admin/productname/delete`,
        update: `${API_ENDPOINT}/admin/productname/update`,
    },
    adminOwner:{
        listData:environment.apiUrl + '/admin/ownername/list',
        generateForm: `${API_ENDPOINT}/admin/ownername/generate-form`,
        save: environment.apiUrl + '/admin/ownername/save',
        delete: `${API_ENDPOINT}/admin/ownername/delete`,
        update: `${API_ENDPOINT}/admin/ownername/update`,
    },
    adminStatus:{
        listData:environment.apiUrl + '/admin/status/list',
        generateForm: `${API_ENDPOINT}/admin/status/generate-form`,
        save: environment.apiUrl + '/admin/status/save',
        delete: `${API_ENDPOINT}/admin/status/delete`,
        update: `${API_ENDPOINT}/admin/status/update`,
    },
    adminSite:{
        listData:environment.apiUrl + '/admin/site/list',
        generateForm: `${API_ENDPOINT}/admin/site/generate-form`,
        save: environment.apiUrl + '/admin/site/save',
        delete: `${API_ENDPOINT}/admin/site/delete`,
        update: `${API_ENDPOINT}/admin/site/update`,
    }

}