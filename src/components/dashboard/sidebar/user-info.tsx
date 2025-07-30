import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "next-auth"

export default function UserInfo({ user }: { user: User | null }) {
    
    return (
        <Button className="w-full my-4 flex items-center justify-between py-5" variant="ghost">
            <div className="flex items-center text-left gap-2">
                <Avatar >
                    <AvatarImage
                        src={user?.image!}
                        alt={user?.name!}
                    />
                    <AvatarFallback className="text-primary"> {user?.name!.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-y-1">
                    {user?.name}
                    <span className="text-muted-foreground">
                        {user?.email}
                    </span>
                    <span className="w-fit">
                        <Badge variant={"secondary"} >
                            {user?.role.toLocaleUpperCase()} Dashboard
                        </Badge>
                    </span>
                </div>
            </div>
        </Button>
    )
}
