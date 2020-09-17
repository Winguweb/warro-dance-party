import React, {Component} from "react";
import seedrandom from 'seedrandom'
import client from "./feathers";

const name = (user) => user.email.split('@')[0]

const colors = [
  '#3FB9B1',
  '#3E9DEC',
  '#FC5E4C',
  '#FFD333',
  '#FF903B'
]

export default class Avatar extends Component {

  static getUserColor(id) {
    // console.log(seedrandom(id)())
    const number = Math.floor(seedrandom(id)() * 5);
    console.log('on number', number)
    return colors[number]
    // let [h, s, l] = [
    //   Number.parseInt(id.slice(0, 2), 16) / 256 * 365,
    //   Number.parseInt(id.slice(2, 4), 16) / 256 * 100,
    //   Number.parseInt(id.slice(4, 6), 16) / 256 * 100
    // ];

    // return `hsl(${h},${s / 2 * 1 + 30}%,${l / 4 + 55}%)`;

  }

  render() {
    let {user, positionInCircle, style, className} = this.props;
    let {email, id} = user;

    let initials = (email || "").slice(0, 2)

    let avatarUrl = user.avatar;
    
    //TODO: Uncomment for development
    if(avatarUrl && avatarUrl.startsWith('/avatars')) {
      avatarUrl = `${window.socketUri}${avatarUrl}`
    }

    const colA = Avatar.getUserColor(user.id);

    let styleBgd = {
      // background: `linear-gradient(${s}deg, ${colA} 20%, ${colB} 80%)`
      border: `solid 1px ${colA}`
    };

    const styleFill = {
      // background: `linear-gradient(${s}deg, ${colA} 20%, ${colB} 80%)`
      background: `${colA}`
    };

    const styleColor = {
      color: `${colA}`
    };

    // If there is an avatar image, use fill also to improve border artifacts
    if(avatarUrl) {
      styleBgd = {... styleBgd, ... styleFill};
    }


    style = style || {};

    return <div className={"avatar "+(className || "")} style={style}>
      <div className={"round-avatar"} style={styleBgd}>
        { avatarUrl ? null : <span className={'initials'} style={styleColor}>{initials}</span> }
        { avatarUrl ? <img src={avatarUrl} alt={user.email} className="gravatar"/> : null }
        { avatarUrl ? null : <div className={'avatar-fill'} style={styleFill}></div> }
      </div>
      <div className="avatar-name bg-dark shadow-sm" style={styleColor}>{name(this.props.user)}</div>
    </div>;
  }
}
