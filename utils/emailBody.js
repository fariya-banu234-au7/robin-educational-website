export const verification = (key) => {
    return `Hi, there,
    <br/>
    Thank you for registration
    <br/><br/>
    Please verify your email by clicking on following link
    <br/>
    <a href="http://localhost:3000/users/verify/${key}">verify</a>
    <br/><br/>
    Have a good day!`;
}

export const forgetPassword = (key) => {
    return `Hi, there,
    <br/><br/>
    We got a request for PASSWORD RECOVERY.
    <br/>
    Please click on following link to change your password.
    <br/>
    This is secret key <b>${key}</b>
    <br/>
    <a href="http://localhost:3000/makePassword">click</a>
    <br/><br/>
    Have a good day!`;
};


export const askMeAnswer = () => {
    return `Hi there,
    <br/><br/>
    We answered your question.
    <br/><br/>
    Have a good day!.`;
}