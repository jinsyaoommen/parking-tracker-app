import React, { Component } from 'react';
import { Column, Table } from 'react-virtualized';
import { PageBodyContainer, PageContainer, CardContainer, CardBody, CardFooter } from '../sharedComponents/Container';
import { Section } from '../sharedComponents/Section';

export default class Home extends Component {
  render() {
    const list = [
      { name: 'abc', description: '123' },
      { name: 'def', description: '456' }
    ];
    return (
      <PageBodyContainer>
        <PageContainer>
          <Section>
            <Table
              width={300}
              height={300}
              headerHeight={20}
              rowHeight={30}
              rowCount={list.length}
              rowGetter={({ index }) => list[index]}
            >
              <Column
                label='Name'
                dataKey='name'
                width={100}
              />
              <Column
                width={200}
                label='Description'
                dataKey='description'
              />
            </Table>
          </Section>
        </PageContainer>
      </PageBodyContainer>
    );
  }
}
