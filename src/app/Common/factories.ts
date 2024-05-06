import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../interfaces/IMusic";

export function newArtist(): IArtist {
    return {
        id: '',
        name: '',
        imageUrl: ''
    }
}

export function newMusic(): IMusic {
    return {
        id: '',
        title: '',
        artists: [],
        album: {
            id: '',
            name: '',
            imageUrl: ''
        },
        time: ''
    }
}