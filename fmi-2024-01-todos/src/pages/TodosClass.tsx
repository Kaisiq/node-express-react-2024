import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";
import React from "react"


// @ts-ignore
export class Todos extends React.Component {
  state = {
    counter: 0,
  }
  render(){
  return (
    <>
      <h1>Podai Podpis</h1>
      <h2>Podadeni podpisi: {this.state.counter}</h2>
{/* @ts-ignore */}
      <button onClick={() => this.setState(state => ({counter: state.counter+1}))}>Podpishi</button>
    </>
  );
  }
}
