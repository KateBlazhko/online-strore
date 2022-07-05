enum Status {
  'OK' = 200,
  'Not Found' = 404,
}

type OptionsUrl = {
  [key: string]: string;
};

class Loader {
  private baseLink: string;

  constructor(baseLink: string) {
      this.baseLink = baseLink;
  }

  public getResp<Data>(
      callback: (data: Data) => void = () => {
          console.error('No callback for GET response');
      }
  ): void {
      this.load<Data>(callback);
  }

  private static errorHandler(res: Response): Response {
      if (!res.ok) {
          if (res.status === Status['Not Found'])
              console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);

          throw Error(res.statusText);
      }

      return res;
  }


  private load<Data>(
      callback: (data: Data) => void
  ): void {
      fetch(this.baseLink)
          .then(Loader.errorHandler.bind(Loader))
          .then((res) => {
              const data = res.json() as Promise<Data>;
              return data;
          })
          .then((data: Data) => callback(data))
          .catch((err: Error) => console.error(err));
  }
}

export default Loader;