const ProfileIcon = ({ user }) => {
    return (
        <div className="cursor-pointer flex items-center space-x-2">
            <img
                src={user.avatar?user.avatar:"/images/avatar.png"}
                alt={user.name}
                className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-semibold">{user.name}</span>
        </div>
    );
}


export { ProfileIcon };