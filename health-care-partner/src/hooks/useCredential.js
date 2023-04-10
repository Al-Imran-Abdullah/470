import { useEffect, useState } from "react";

const useCredential = () => {

    const id = localStorage.getItem('uId')
    const [user, setUser] = useState({});
    const [mood, setMood] = useState([])
    const [water, setWater] = useState([])

    // getting userInfo from localStorage id and backend API
    const userData = () => {
        fetch('http://localhost:5001/user/' + id)
            .then(response => response.json())
            .then(data => setUser(data))
    }

    useEffect(() => {
        if (id) {
            userData()
        }
        else {
            setUser({})
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (user.email) {
            fetch('http://localhost:5001/mood-by-email/' + user.email)
                .then(response => response.json())
                .then(data => data.status === true && setMood(data.result))
        }
    }, [user.email])

    useEffect(() => {
        if (user.email) {
            fetch('http://localhost:5001/water-by-email/' + user.email)
                .then(response => response.json())
                .then(data => data.status === true && setWater(data.result))
        }
    }, [user.email])

    const logOut = () => {
        localStorage.removeItem('uId')
        setUser({})
    }

    return {
        setUser,
        user,
        mood,
        setMood,
        water,
        setWater,
        logOut
    }
};

export default useCredential;