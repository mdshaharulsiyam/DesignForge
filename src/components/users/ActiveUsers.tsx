import { generateRandomName } from "@/lib/utils";
import { useOthers, useSelf } from "../../../liveblocks.config";
import { Avatar } from "./Avater";
import styles from './index.module.css'
const ActiveUsers = () => {
    const users = useOthers();
    const currentUser = useSelf();
    console.log(currentUser)
    const hasMoreUsers = users.length > 3;

    return (
        <main className="flex h-screen w-full select-none place-content-center place-items-center">
            <div className="flex pl-3">
            {currentUser && (
                        <Avatar otherStyle='border-[3px] border-primary-green' name="You" />
                )}
                {users.slice(0, 3).map(({ connectionId, info }) => {
                    return (
                        <Avatar key={connectionId}  name={generateRandomName()} otherStyle='-ml-3'/>
                    );
                })}

                {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

             
            </div>
        </main>
    );
}
export default ActiveUsers
//src={currentUser?.info?.avatar}