import React, { Component } from 'react';
import './Palette.css';

class Palette extends Component {
  render() {
    const { colors, color, onChange } = this.props;

    const palette = colors.map((bgColor) => {
      return (
        <div className={`palette-color-box ${color == bgColor ? "active" : ''}`} style={{ background: bgColor }} onClick={()=> onChange(bgColor)}></div>
      );
    });

    return <div className="palette">{palette}</div>;
  }
}

export default Palette;
