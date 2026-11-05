import womenImg from '../assets/audience_women.png';
import menImg from '../assets/audience_men.png';
import kidsImg from '../assets/audience_kids.png';
import giftsImg from '../assets/audience_gifts.png';

export const audiences = [
  {
    id: 1,
    label: "Women",
    subtitle: "Rings, Necklaces & Earrings",
    link: "/collections?for=women",
    image: womenImg,
    bgColor: "#9B6B8A"
  },
  {
    id: 2,
    label: "Men",
    subtitle: "Chains, Kada & Rings",
    link: "/collections?for=men",
    image: menImg,
    bgColor: "#4A6B8A"
  },
  {
    id: 3,
    label: "Kids",
    subtitle: "Delicate Everyday Pieces",
    link: "/collections?for=kids",
    image: kidsImg,
    bgColor: "#8A9B6B"
  },
  {
    id: 4,
    label: "Gifts",
    subtitle: "For Every Occasion",
    link: "/collections?for=gifts",
    image: giftsImg,
    bgColor: "#C8A24A"
  }
];
