import { addMilliseconds, format } from "date-fns";
import { IArtist } from "../interfaces/IArtist";
import { IMusic } from "../interfaces/IMusic";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUser } from "../interfaces/IUser";
import { newMusic } from "./factories";

export function SetSpotifyUserToIUser(user: SpotifyApi.CurrentUsersProfileResponse): IUser {
    return {
        id: user.id,
        name: user.display_name,
        imageUrl: user.images.pop().url
    }
}

export function SetSpotifyPlaylistToIPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    return {
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images?.pop().url
    }
}

export function SetSpotifyArtistToIArtist(artist: SpotifyApi.ArtistObjectFull): IArtist {
    return {
        id: artist.id,
        name: artist.name,
        imageUrl: artist.images.sort((a, b) => a.width - b.width).pop().url
    }
}

export function SetSpotifyArtistToSingleIArtist(artist: SpotifyApi.SingleArtistResponse): IArtist {
    return {
        id: artist.id,
        name: artist.name,
        imageUrl: artist.images.sort((a, b) => a.width - b.width).pop().url
    }
}

export function SetSpotifyTrackToIMusic(track: SpotifyApi.TrackObjectFull): IMusic {

    if(!track) {
        return newMusic()
    }

    const msToMinute = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms)
        return format(data, 'mm:ss')
    }

    return {
        id: track.uri,
        title: track.name,
        artists: track.artists.map(artist => ({
            id: artist.id,
            name: artist.name
        })),
        album: {
            id: track.album.id,
            name: track.album.name,
            imageUrl: track.album.images.shift().url
        },
        time: msToMinute(track.duration_ms)
    }
}