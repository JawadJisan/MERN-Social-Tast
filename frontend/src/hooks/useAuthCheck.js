import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/user/userSlice";


export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const localAuth = localStorage?.getItem("auth");

        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.user) {
                dispatch(
                    userLoggedIn({
                        user: auth.user,
                    })
                );
            }
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}
