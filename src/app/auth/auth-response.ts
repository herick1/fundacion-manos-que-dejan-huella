export interface AuthResponse {
    user: {
        usu_id: number,
        usu_nombre: string,
        usu_apellido: string,
        usu_email: string,
        usu_password: string
    },
    access_token: string,
    expires_in: number


}