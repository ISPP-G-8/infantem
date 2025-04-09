import { Text, TouchableOpacity, View } from 'react-native';

type PaginationProps = {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, page, setPage }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const num = index +1; // We want to show an 1-indexed array 
        return (
          <TouchableOpacity key={num} onPress={() => setPage(num)}>
            <View
              style={{
                padding: 10,
                margin: 5,
                backgroundColor: num === page ? "#1565C0" : 'lightgray',
                borderRadius: 5,
              }}
            >
              <Text style={{ color: num === page ? 'white' : 'black' }}>{num}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Pagination;
