interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    designation_id: number;
    date_of_joining: Date;
    user_uuid: string;
}

export default User;