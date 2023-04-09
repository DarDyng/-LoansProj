import React from "react";

export function formatArtists(artists: string[]) {
    if (artists.length === 0) {
        return <p>No artist</p>
    }

    const linkElements = artists.map((artist: string, index: number) => {
        console.log(artist, index, index === artist.length - 1)
        const separator = index === artists.length - 1 ? <></> : <span>, </span>
        return (
            <React.Fragment key={index}>
                <a href="#!">{artist}</a>{separator}
            </React.Fragment>
        );
    });


    return <>{linkElements}</>;
}