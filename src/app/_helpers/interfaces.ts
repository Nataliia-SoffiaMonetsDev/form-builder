export interface User {
    name?: string,
    email: string,
    password?: string,
    id?: number
}

export interface Login {
    accessToken: string,
    user: User
}

export interface FormStyles {
    background: string,
    borderColor: string,
    borderType: string,
    formLabel: string,
    textColor: string
}

export interface FieldStyles {
    formLabel: string,
    width: string,
    height: string,
    fontSize: string,
    fontWeight: string,
    colorInput: string,
    borderStyle: string,
    requiredField: boolean,
    addField: string,
    placeholder: string
}

