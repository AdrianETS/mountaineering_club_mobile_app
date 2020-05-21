import Constants from "../utils/Constants";
import StorageProvider from "../services/StorageProvider";

const getMemberInfo = function(id) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch(Constants.url + "members/" + id + '?token=' + token))
            .then(res => res.json())
            .then(json => {
                console.log("Esto devuelvo");
                console.log(JSON.stringify(json));
                resolve(json);
            })
    })
}

const editMember = function(member, navigation) {
    //return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch(Constants.url + 'members?token=' + token, {
                method: 'PUT',
                body: JSON.stringify({
                    _id: member._id,
                    name: member.name,
                    surname: member.surname,
                    email: member.email,
                    birthDate: member.birthDate,
                    clubId: member.clubId,
                    licenseNumber: member.licenseNumber,
                    type: member.type,
                    password: member.password,
                    responsibilityAgreementSigned: (member.responsibilityAgreementSigned === "true" && true) || false
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }))
            .then(res => res.json())
            .then(()=>navigation.navigate('Dashboard'))
    
}

const getExcursionInfo = function(id) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch(Constants.url + 'excursions/' + id + '?token=' + token))
            .then(res => res.json())
            .then((json) => {
                resolve(json)
            })
    })
}

const getExcursionList = function() {
    return new Promise((resolve, reject) => {
      StorageProvider.getData("token")
        .then(token => fetch(Constants.url + 'excursions/list?token=' + token))
          .then(res => res.json())
          .then((json) => {
            console.log(json);
            resolve(json);
          })
    })
  }

const editExcursion = function(excursion) {
    return new Promise((resolve, reject) => {
        StorageProvider.getData("token")
            .then(token => fetch(Constants.url + 'excursions?token=' + token, {
                method: 'PUT',
                body: JSON.stringify({
                    _id: excursion._id,
                    name: excursion.name,
                    date: excursion.date,
                    users_id: excursion.users_id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }))
            .then(res => res.json())
            .then(json => resolve(json));
    })
}

export default {getMemberInfo, editMember, getExcursionInfo, editExcursion, getExcursionList}