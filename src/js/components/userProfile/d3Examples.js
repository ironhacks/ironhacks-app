import React from 'react';
import styled from 'styled-components';
import {registerStats} from '../../utilities/registerStat.js';

import ExampleA from './d3examplesGif/a.gif';
import ExampleB from './d3examplesGif/b.gif';
import ExampleC from './d3examplesGif/c.gif';
import ExampleD from './d3examplesGif/d.gif';
import ExampleE from './d3examplesGif/e.gif';
import ExampleF from './d3examplesGif/f.png';
import ExampleG from './d3examplesGif/g.gif';
import ExampleH from './d3examplesGif/h.gif';
import ExampleI from './d3examplesGif/i.gif';
import ExampleJ from './d3examplesGif/j.png';
import ExampleK from './d3examplesGif/k.png';
import ExampleL from './d3examplesGif/l.gif';
import ExampleM from './d3examplesGif/m.png';
import ExampleN from './d3examplesGif/n.gif';

const D3Examples = styled('div')`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const ExampleContainer = styled('div')`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 30%;
	height: 420px;
	margin-bottom: 15px;

	img {
		width: 100%;
		height: 380px;
		object-fit: contain;
		margin-bottom: 10px;
	}

`;

const registerStat = (props, example) => {
  const statData = {
    userId: props.user.uid,
    example,
    event: 'on-d3example-click',
    metadata: {
      location: 'profile-page',
    },
  };
  registerStats(statData);
};

export default function Examples(props) {
  return (
    <D3Examples className='padding'>
      <ExampleContainer onClick={() => registerStat(props, 'a')}>
        <img src={ExampleA} alt="a"/>
        <a href='http://bl.ocks.org/NPashaP/cd80ab54c52f80c4d84cad0ba9da72c2'
					 target='_blank'
					 rel="noreferrer noopener">Example A
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'b')}>
        <img src={ExampleB} alt="a"/>
        <a href='http://bl.ocks.org/Neilos/584b9a5d44d5fe00f779'
					 target='_blank'
					 rel="noreferrer noopener">Example B
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'c')}>
        <img src={ExampleC} alt="a"/>
        <a href='https://bl.ocks.org/mbostock/3884955'
					 target='_blank'
					 rel="noreferrer noopener">Example C
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'd')}>
        <img src={ExampleD} alt="a"/>
        <a href='http://bl.ocks.org/anupsavvy/9513382'
					 target='_blank'
					 rel="noreferrer noopener">Example D
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'e')}>
        <img src={ExampleE} alt="a"/>
        <a href='http://bl.ocks.org/rkirsling/33a9e350516da54a5d4f'
					 target='_blank'
					 rel="noreferrer noopener">Example E
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'f')}>
        <img src={ExampleF} alt="a"/>
        <a href='https://bl.ocks.org/mbostock/4061502'
					 target='_blank'
					 rel="noreferrer noopener">Example F
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'g')}>
        <img src={ExampleG} alt="a"/>
        <a href='http://bl.ocks.org/oyyd/859fafc8122977a3afd6'
					 target='_blank'
					 rel="noreferrer noopener">Example G
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'h')}>
        <img src={ExampleH} alt="a"/>
        <a href='http://bl.ocks.org/ianyfchang/8119685'
					 target='_blank'
					 rel="noreferrer noopener">Example H
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'i')}>
        <img src={ExampleI} alt="a"/>
        <a href='http://bl.ocks.org/NPashaP/a74faf20b492ad377312'
					 target='_blank'
					 rel="noreferrer noopener">Example I
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'j')}>
        <img src={ExampleJ} alt="a"/>
        <a href='https://beta.observablehq.com/@mbostock/d3-choropleth'
					 target='_blank'
					 rel="noreferrer noopener">Example J
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'k')}>
        <img src={ExampleK} alt="a"/>
        <a href='http://bl.ocks.org/fhernand/be1e9c9fdb0473292abf'
					 target='_blank'
					 rel="noreferrer noopener">Example K
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'l')}>
        <img src={ExampleL} alt="a"/>
        <a href='http://bl.ocks.org/bbest/2de0e25d4840c68f2db1'
					 target='_blank'
					 rel="noreferrer noopener">Example L
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'm')}>
        <img src={ExampleM} alt="a"/>
        <a href='https://beta.observablehq.com/@mbostock/d3-treemap'
					 target='_blank'
					 rel="noreferrer noopener">Example M
        </a>
      </ExampleContainer>
      <ExampleContainer onClick={() => registerStat(props, 'n')}>
        <img src={ExampleN} alt="a"/>
        <a href='https://bl.ocks.org/dahis39/f28369f0b17b456ac2f1fa9b937c5002'
					 target='_blank'
					 rel="noreferrer noopener">Example N
        </a>
      </ExampleContainer>
    </D3Examples>
  );
}
