import { generateRandomName } from "@/lib/utils";
import { useOthers, useSelf } from "../../../liveblocks.config";
import { Avatar } from "./Avater";
import styles from './index.module.css'
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
// import { auth } from "@/auth/auth";
// import { Presence } from "@/types/type";
// import { BaseUserMeta, User } from "@liveblocks/client";

const ActiveUsers = async () => {
    // const session = await auth()
    const session = useSession()
    // console.log(session)
    const users = useOthers();
    let currentUser = useSelf();//avatar
    if (!session?.data?.user?.email) {
        currentUser.info = undefined
        currentUser.id = undefined
    } else if (!currentUser?.info) {
        currentUser.info = {
            ...currentUser.info,
            name: session?.data?.user?.name!,
            avatar: session?.data?.user?.image!
        }
        currentUser.id = session?.data?.user?.email
    }
    console.log(users)
    const hasMoreUsers = users.length > 3;

    return (
        <main className="flex h-screen w-full select-none place-content-center place-items-center">
            <div className="flex pl-3">
                {currentUser && (
                    <Avatar otherStyle='border-[3px] border-primary-green' avatar={currentUser?.info?.avatar} name={currentUser?.info?.name} />
                )}
                {users.slice(0, 3).map(({ connectionId, info }) => {
                    return (
                        <Avatar key={connectionId} avatar={info?.avatar} name={info?.name} otherStyle='-ml-3' />
                    );
                })}

                {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}


            </div>
        </main>
    );
}
export default ActiveUsers
//src={currentUser?.info?.avatar} name={generateRandomName()}