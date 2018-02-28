import {Promise} from "es6-promise";
import {PersoniumClient, PersoniumData} from "personium-client";
export interface Config {
    unit: string,
    cell: string,
    username: string,
    password: string,
}

declare const setting: Config;

const PLACELIST: any = {
    "16": "S307",
    "14": "N210",
    "13": "N108",
    "15": "N410",
    "17": "セミナールーム",
    "27": "N107",
    "18": "C601",
};

const client = new PersoniumClient(setting.unit);

client.login(setting.cell, setting.username, setting.password, (refresh)=>{
    client.refreshAccessToken(setting.cell, refresh);
}).then((token) => {
    console.log("Personium logined.");
}).catch((error)=>{
    console.error(error);
});

export function postPresenceToPersonium(place: string) {
    return new Promise<void>((resolve, reject)=>{
        const path = "__/Info/presence";
        const data = {
            cellname: setting.cell,
            presence: place, 
            map: "",
        };
        const rawData = JSON.stringify(data);
        const postData = {raw: rawData};
        client.post(setting.cell, path, postData).then(()=>{
            resolve();
            console.log("Personium updated.");
        }).catch((error: any)=>{
            reject(error);
        });
    });
}

export function getPlace(minor?: string) {
    if(minor){
        return PLACELIST[minor];
    }else {
        const placeList: string[] = Object.keys(PLACELIST).map(id => PLACELIST[id]);
        return placeList;
    }
}

export function getCellInfo() {
    return {
        unit: setting.unit,
        name: setting.cell,
    }
}
