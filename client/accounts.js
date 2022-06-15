Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    requestPermissions: {},
    // extraSignupFields: [{
    //     fieldName: 'username',
    //     fieldLabel: 'Username',
    //     inputType: 'text',
    //     visible: true,
    //     validate: function(value, errorFunction) {
    //       if (!value) {
    //         errorFunction("Please write a username");
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     }
    // }, {
    //     fieldName: 'first-name',
    //     fieldLabel: 'First name',
    //     inputType: 'text',
    //     visible: true,
    //     validate: function(value, errorFunction) {
    //       if (!value) {
    //         errorFunction("Please write your first name");
    //         return false;
    //       } else {
    //         return true;
    //       }
    //     }
    // }]
});

// ServiceConfiguration.configurations.upsert(
//     {service: "facebook"},
//     {
//       $set: {
//         appId: "1228405371232140",
//         secret: "7832aaf055f4cae755423a06be833e38"
//       }
//     }
//   );
