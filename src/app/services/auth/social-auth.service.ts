import { AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("341004786579-f3655tfhkcq4ft813rjs3gh1ganmb36n.apps.googleusercontent.com")
    }
]);

export function provideConfig() {
    return config;
}