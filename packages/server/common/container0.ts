class Container {
  private services: Map<string, any>;

  constructor() {
    this.services = new Map();
  }

  register<T>(name: string, instance: T): void {
    this.services.set(name, instance);
  }

  resolve<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service not found: ${name}`);
    }
    return service as T;
  }
}
export const container = new Container();
export default container;
