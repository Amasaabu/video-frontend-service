"use client"
const ProfileIcon = ({ user }) => {
    console.log(user);
    return (
        <div className="cursor-pointer flex items-center space-x-2">
            <img
                src={user.avatar?user.avatar:"/images/avatar.png"}
                alt={"user.name"}
                className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-semibold">{user.user?.firstname}</span>
        </div>

    );
}


export { ProfileIcon };