
import { useMemo } from "react";
import { useOthers, useSelf } from "../../../liveblocks.config";
import { Avatar } from "./Avater";
import styles from './index.module.css'
import { useSession } from "next-auth/react";

const ActiveUsers = () => {

    const session = useSession()
    const users = useOthers();
    let currentUser = useSelf();
    // console.log(currentUser)
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
    // console.log(currentUser)
    const hasMoreUsers = users.length > 3;
    const memorigedUser = useMemo(() => {
        return (
            <div className="flex items-center justify-center gap-1 py-2">
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
            </div>
        )
    }, [users.length])
    return memorigedUser
}
export default ActiveUsers
//src={currentUser?.info?.avatar} name={generateRandomName()}