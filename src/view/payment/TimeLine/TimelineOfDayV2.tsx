import React from 'react';
import { styled } from '@mui/material/styles';
import { SimplePaletteColorOptions } from '@mui/material/styles/createPalette';
import { palette } from 'styles/palette';
import { SCALE_UNIT } from 'constants/static';
import { IArtist, IStage } from 'types/show';
import moment, { Moment } from 'moment';

const StyledTableOfDay = styled('div')({
    width: `calc(100vw - 1em - 3.8em)`,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
});

const StyledTimelineBtnContainer = styled('div')({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
});

const StyledTimelineBtn = styled('button')(({ theme }) => ({
    position: 'absolute',
    border: 'none',
    borderRadius: '0.5em',
    padding: '0.5em',
    zIndex: 1,
    '&:hover': {
        cursor: 'pointer',
        filter: 'brightness(0.95)',
    },
    '&:focus': {
        outline: '0',
    },
}));

const StyledBtnContent = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.25em',
    color: theme.palette.text.primary,
}));

const StyledBtnTitle = styled('div')(({ theme }) => ({
    color: theme.palette.text.secondary,
    // fontWeight: 'bold',
    // fontSize: '16px',
    fontSize: '1rem',
    width: '100%',
}));

interface ShowItem extends IArtist {
    stageName: string;
    layer: number;
    itemColor: SimplePaletteColorOptions;
    overlappingCount: number;
}

interface TimeLineButtonProps {
    megaStartTime: Moment;
    showInfo: ShowItem;
}

const TimeLineButton: React.FC<TimeLineButtonProps> = ({ megaStartTime, showInfo }) => {
    const { name, startTime, endTime, itemColor, stageName, layer, overlappingCount } = showInfo;
    const startMoment = moment(startTime);
    const endMoment = moment(endTime);

    const top = moment.duration(startMoment.diff(megaStartTime)).asMinutes() / 10;
    const height = moment.duration(endMoment.diff(startMoment)).asMinutes() / 10;
    
    // Calculate width based on overlapping events
    const width = 100 / overlappingCount;
    // The left position is now based on the layer number (0, 1, 2, etc.)
    const leftPosition = layer * width;

    return (
        <StyledTimelineBtnContainer
            style={{
                top: `calc(${top * SCALE_UNIT}rem + 0.5rem)`,
            }}
        >
            <StyledTimelineBtn
                style={{
                    left: `${leftPosition}%`,
                    width: `${width}%`,
                    minHeight: `${height * SCALE_UNIT}rem`,
                    height: `${height * SCALE_UNIT}rem`,
                    backgroundColor: itemColor.main,
                }}
            >
                <StyledBtnContent>
                    <StyledBtnTitle>{name}</StyledBtnTitle>
                    <div>{stageName}</div>
                    {/* <div>{startMoment.format('HH:mm') + ' - ' + endMoment.format('HH:mm')}</div> */}
                    {/* <div>Layer: {layer}, Total: {overlappingCount}</div>  //for debugging */}
                </StyledBtnContent>
            </StyledTimelineBtn>
        </StyledTimelineBtnContainer>
    );
};

interface TimeLineOfDayV2Props {
    startTime: Moment;
    endTime: Moment;
    stages: IStage[];
    day: number;
    selectedDay: number;
}

export default function TimeLineOfDayV2(props: TimeLineOfDayV2Props) {
    const { startTime, endTime, stages, day, selectedDay } = props;
    const height = moment.duration(endTime.diff(startTime)).asMinutes() / 10;

    // Initialize stages with basic info
    const processedStages: ShowItem[][] = stages
        .map((stage, index) =>
            stage.artists.map((artist) => ({
                stageName: stage.name,
                itemColor: palette.stage[index as keyof typeof palette.stage],
                layer: 0,
                overlappingCount: 1,
                ...artist,
            }))
        )
        .filter((items) => items.length > 0);

    // Flatten all artists into a single array
    const allArtists = processedStages.flat();

    // Function to check if two time ranges overlap
    const isOverlapping = (event1: ShowItem, event2: ShowItem) => {
        const start1 = moment(event1.startTime);
        const end1 = moment(event1.endTime);
        const start2 = moment(event2.startTime);
        const end2 = moment(event2.endTime);
        return start1 < end2 && start2 < end1;
    };

    // Find overlapping groups
    const overlappingGroups: ShowItem[][] = [];
    const processedIds = new Set<string>();

    allArtists.forEach(artist => {
        if (processedIds.has(artist.id)) return;

        const overlappingGroup = [artist];
        processedIds.add(artist.id);

        // Find all artists that overlap with the current group
        allArtists.forEach(otherArtist => {
            if (processedIds.has(otherArtist.id)) return;

            // Check if the other artist overlaps with any artist in the current group
            const hasOverlap = overlappingGroup.some(groupArtist => 
                isOverlapping(groupArtist, otherArtist)
            );

            if (hasOverlap) {
                overlappingGroup.push(otherArtist);
                processedIds.add(otherArtist.id);
            }
        });

        if (overlappingGroup.length > 0) {
            // Sort by start time within group
            overlappingGroup.sort((a, b) => 
                moment(a.startTime).diff(moment(b.startTime))
            );

            // Assign layers and overlapping count
            overlappingGroup.forEach((artist, index) => {
                artist.layer = index;
                artist.overlappingCount = overlappingGroup.length;
            });

            overlappingGroups.push(overlappingGroup);
        }
    });

    // Handle any remaining non-overlapping artists
    allArtists.forEach(artist => {
        if (!processedIds.has(artist.id)) {
            artist.layer = 0;
            artist.overlappingCount = 1;
            overlappingGroups.push([artist]);
            processedIds.add(artist.id);
        }
    });

    return (
        <StyledTableOfDay
            style={{
                display: day === selectedDay ? '' : 'none',
                height: `${height * SCALE_UNIT}rem`,
            }}
        >
            {allArtists.map((item) => (
                <TimeLineButton
                    megaStartTime={startTime}
                    key={item.id}
                    showInfo={item}
                />
            ))}
        </StyledTableOfDay>
    );
}