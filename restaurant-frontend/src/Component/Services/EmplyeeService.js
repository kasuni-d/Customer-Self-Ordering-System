import axios from "axios";

const EMPLOYEE_BASE_REST_API_URL= 'http://localhost:8080/api/employee';
const ROLE_BASE_REST_API_URL= 'http://localhost:8080/api/role';

class EmployeeService{
    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_BASE_REST_API_URL,employee)
    }

    getEmployeeById(employee_id){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + employee_id);
    }

    updateEmployee(employee_id,employee){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' + employee_id,employee);
    }

    deleteEmployee(employee_id){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + '/' + employee_id);
    }

    getAllRoles(){
        return axios.get(ROLE_BASE_REST_API_URL);
    }

}

export default new EmployeeService();