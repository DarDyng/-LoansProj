import axios from "axios";
import { title } from "process";
import Swal from "sweetalert2";
import { urlAccounts } from "../endpoints";
import Button from "../UI/Button";
import customConfirm from "../utils/customConfirm";
import IndexEntity from "../utils/IndexEntity";
import { userDTO } from "./auth-models";

const IndexUsers = () => {

    const makeAdmin = async (id: string) => {
        await doAdmin(`${urlAccounts}/makeAdmin`, id);
    };
    
    
    const removeAdmin = async (id: string) => {
        await doAdmin(`${urlAccounts}/removeAdmin`, id);
    };

    const doAdmin = async (url: string, id: string) => {
        await axios.post(url, JSON.stringify(id), {
            headers: {"Content-Type" : "application/json"}
        });

        Swal.fire({
            title: "Success",
            text: "Opetation finished correctly",
            icon: "success"
        });
    };

    return <>
        <IndexEntity<userDTO>
            title={"Users"}
            url={`${urlAccounts}/listUsers`}>
            {(users) => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <tr key={user.id}>
                        <td>
                            <Button
                                onClick={() => customConfirm(() => makeAdmin(user.id),
                                    `Do you wish to make ${user.email} and admin?`, "Do it")}>
                                Make Admin
                            </Button>

                            <Button
                                className="btn btn-danger ms-2"
                                onClick={() => customConfirm(() => removeAdmin(user.id),
                                    `Do you wish to remove ${user.email} from admin?`, "Do it")}>
                                Remove Admin
                            </Button>
                        </td>
                        <td>
                            {user.email}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    </>
};

export default IndexUsers;