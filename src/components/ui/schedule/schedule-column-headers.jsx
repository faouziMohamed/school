import { Grid, GridItem, Text } from '@chakra-ui/react';

/**
 * @param {Object} props
 * @param {string[]} props.weekDays
 */
export function ScheduleColumnHeaders({ weekDays }) {
  return (
    <Grid
      templateColumns='100px repeat(6, 1fr)'
      gap={2}
      w='100%'
      bgColor='white'
      pt={4}
    >
      <GridItem>
        <Text fontSize='sm' fontWeight='medium' color='gray.600'>
          Time
        </Text>
      </GridItem>
      {weekDays.map((day) => (
        <GridItem key={day}>
          <Text fontSize='sm' fontWeight='medium' textAlign='center'>
            {day}
          </Text>
        </GridItem>
      ))}
    </Grid>
  );
}
