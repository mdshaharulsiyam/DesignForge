
import { useMemo } from "react";
import { useOthers, useSelf } from "../../../liveblocks.config";
import { Avatar } from "./Avater";
import styles from './index.module.css'
import { useSession } from "next-auth/react";

const ActiveUsers = () => {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > 3;
    const memorigedUser = useMemo(() => {
        return (
            <div className="flex items-center justify-center gap-1 py-2">
                <div className="flex pl-3">
                    {currentUser && (
                        <Avatar otherStyle='border-[3px] border-primary-green' avatar={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`} name={'annonymus'} />
                    )}
                    {users.slice(0, 3).map(({ connectionId, info }) => {
                        return (
                            <Avatar key={connectionId} avatar={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`} name={'annonymus'} otherStyle='-ml-3' />
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