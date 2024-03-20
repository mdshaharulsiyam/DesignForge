import React from "react";
import styles from "./avater.module.css";
import Image from "next/image";


const IMAGE_SIZE = 48;

export function Avatar({ name, otherStyle, avatar }: { otherStyle: string; name: string | undefined, avatar: string | undefined }) {
    return (
        <div className={`relative h-9 w-9 rounded-full ${styles.avatar} ${otherStyle}`} data-tooltip={name}>
            <Image
                src={avatar?avatar:`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
                alt={name?name:'anonymous'}
                fill
                className={styles.avatar_picture}
            />
        </div>
    );
}
//                src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}