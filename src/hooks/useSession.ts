export default function useSession() {
    const GetSession = (name: string) => {
        return JSON.parse(sessionStorage.getItem(name) || "");
    }
    const SetSession = (name: string, item: any): void => {
        sessionStorage.setItem(name, JSON.stringify(item));
    }
    const DeleteSession = (name: string): void => {
        sessionStorage.removeItem(name);
    }
    return [GetSession, SetSession, DeleteSession];
}

