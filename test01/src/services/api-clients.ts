import React from "react";
import { IDType, Product } from "../models/product-model";

interface EntityConstructor<V> {
  new (...args: any): V;
  className: string;
}

class APIClient {
  constructor(private baseUrl: string) {}
  async findAll<Product>(ctor: EntityConstructor<Product>): Promise<Product[]> {
    return this.fetchData(`${this.baseUrl}/${ctor.className.toLowerCase()}s`);
  }
  async deleteOne<Product>(ctor: EntityConstructor<Product>, id: number): Promise<Product> {
    return this.fetchData(`${this.baseUrl}/${ctor.className.toLowerCase()}s/${id}`, {
      method: "DELETE",
    });
  }
  async createOne<Product>(
    ctor: EntityConstructor<Product>,
    entity: Omit<Product, "id">
  ): Promise<Product> {
    return this.fetchData(`${this.baseUrl}/${ctor.className.toLowerCase()}s`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
  }
  async update<Product>(
    ctor: EntityConstructor<Product>,
    entity: Product,
    id: number
  ): Promise<Product> {
    return this.fetchData(`${this.baseUrl}/${ctor.className.toLowerCase()}s/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
  }

  private async fetchData<D>(uri: string, options?: RequestInit): Promise<D> {
    const resp = await fetch(uri, options);
    if (resp.status >= 400) {
      throw new Error(await resp.text());
    }
    return resp.json();
  }
}

const API = new APIClient("http://localhost:9000");
export default API;
